from rest_framework.permissions import BasePermission

class IsAdminOrStaff(BasePermission):
    def has_permission(self, request, view):
        u = request.user
        return bool(u and u.is_authenticated and getattr(u, "role", None) in ("ADMIN","STAFF"))

class IsAdminStaffOrOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        u = request.user
        if not (u and u.is_authenticated):
            return False
        if getattr(u, "role", None) in ("ADMIN","STAFF"):
            return True
        return hasattr(obj, "user_id") and obj.user_id == u.id