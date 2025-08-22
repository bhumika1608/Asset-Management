from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class Asset(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    condition = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    date = models.DateField()
    quantity = models.PositiveIntegerField()
    maintenanceQuantity = models.PositiveIntegerField(default=0)
    contributedBy = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name



# ✅ Add this Maintenance model below Asset:


class Maintenance(models.Model):
    asset = models.ForeignKey('Asset', on_delete=models.CASCADE, related_name='maintenances')
    name = models.CharField(max_length=100, blank=True, null=True)
    date = models.DateField()

    def __str__(self):
        return f"{self.name} ({self.asset.name})"
