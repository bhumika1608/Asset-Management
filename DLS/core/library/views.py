from rest_framework import viewsets, permissions, filters
from .models import Author, Category, Book, BookCopy, Member, Loan
from .serializers import *
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import now

class IsStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in ("GET", "HEAD", "OPTIONS"): return True
        return request.user and request.user.is_staff

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = [IsStaffOrReadOnly]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsStaffOrReadOnly]

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.select_related("author","category").all()
    serializer_class = BookSerializer
    permission_classes = [IsStaffOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ["title","isbn","author__name","category__name"]

class BookCopyViewSet(viewsets.ModelViewSet):
    queryset = BookCopy.objects.select_related("book").all()
    serializer_class = BookCopySerializer
    permission_classes = [IsStaffOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ["barcode","book__title","book__isbn"]

class MemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Member.objects.select_related("user").all()
    serializer_class = MemberSerializer
    permission_classes = [permissions.IsAuthenticated]

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.select_related("copy","member","copy__book").all()
    serializer_class = LoanSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=["post"])
    def return_book(self, request, pk=None):
        loan = self.get_object()
        if loan.returned_at:
            return Response({"detail":"Already returned"}, status=400)
        loan.returned_at = now().date()
        loan.copy.is_available = True
        loan.copy.save()
        loan.save()
        return Response(LoanSerializer(loan).data)
def perform_create(self, serializer):
    loan = serializer.save()
    # After saving the loan, mark the copy as unavailable
    loan.copy.is_available = False
    loan.copy.save()