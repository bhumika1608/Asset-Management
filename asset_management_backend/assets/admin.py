from django.contrib import admin
from .models import Asset, Maintenance

@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'condition', 'location', 'date', 'quantity', 'maintenanceQuantity', 'contributedBy')
    search_fields = ('name', 'category', 'location')
    

@admin.register(Maintenance)
class MaintenanceAdmin(admin.ModelAdmin):
    list_display = ('asset_name', 'asset_date', 'asset_location', 'asset_maintenance_quantity')
    search_fields = ('asset__name',)

    def asset_name(self, obj):
        return obj.asset.name

    def asset_date(self, obj):
        return obj.asset.date

    def asset_location(self, obj):
        return obj.asset.location

    def asset_maintenance_quantity(self, obj):
        return obj.asset.maintenanceQuantity
