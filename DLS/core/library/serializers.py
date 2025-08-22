from rest_framework import serializers
from .models import Author, Category, Book, BookCopy, Member, Loan
from django.contrib.auth.models import User

class AuthorSerializer(serializers.ModelSerializer):
    class Meta: model = Author; fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta: model = Category; fields = "__all__"

class BookCopySerializer(serializers.ModelSerializer):
    book_title = serializers.ReadOnlyField(source="book.title")
    class Meta: model = BookCopy; fields = ["id","barcode","is_available","book","book_title"]

class BookSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source="author.name")
    copies_available = serializers.SerializerMethodField()
    class Meta:
        model = Book
        fields = ["id","title","isbn","author","author_name","category","description","published_year","copies_available"]
    def get_copies_available(self, obj): return obj.copies.filter(is_available=True).count()

class UserSerializer(serializers.ModelSerializer):
    class Meta: model = User; fields = ["id","username","first_name","last_name","email"]

class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta: model = Member; fields = ["id","user","roll_no","phone"]

class LoanSerializer(serializers.ModelSerializer):
    copy_barcode = serializers.ReadOnlyField(source="copy.barcode")
    book_title = serializers.ReadOnlyField(source="copy.book.title")
    member_name = serializers.ReadOnlyField(source="member.user.username")
    class Meta:
        model = Loan
        fields = ["id","copy","copy_barcode","book_title","member","member_name","issued_at","due_at","returned_at","is_overdue"]
        read_only_fields = ["issued_at","returned_at","is_overdue"]
