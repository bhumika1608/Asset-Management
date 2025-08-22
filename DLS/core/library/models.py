
from django.db import models
from django.contrib.auth.models import User

class Author(models.Model):
    name = models.CharField(max_length=200)
    bio = models.TextField(blank=True)

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

class Book(models.Model):
    title = models.CharField(max_length=255)
    isbn = models.CharField(max_length=20, unique=True)
    author = models.ForeignKey(Author, on_delete=models.PROTECT, related_name="books")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(blank=True)
    published_year = models.PositiveIntegerField(null=True, blank=True)

class BookCopy(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="copies")
    barcode = models.CharField(max_length=64, unique=True)
    is_available = models.BooleanField(default=True)

class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="member")
    # optional extra fields
    roll_no = models.CharField(max_length=50, blank=True)
    phone = models.CharField(max_length=20, blank=True)

class Loan(models.Model):
    copy = models.ForeignKey(BookCopy, on_delete=models.PROTECT, related_name="loans")
    member = models.ForeignKey(Member, on_delete=models.PROTECT, related_name="loans")
    issued_at = models.DateField(auto_now_add=True)
    due_at = models.DateField()
    returned_at = models.DateField(null=True, blank=True)

    @property
    def is_overdue(self):
        from django.utils.timezone import now
        return self.returned_at is None and self.due_at < now().date()
