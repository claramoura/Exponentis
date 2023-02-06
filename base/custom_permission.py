from rest_framework import permissions

# Allows unauthorized users to perform only safe requests while admin users have unrestricted access.
class IsAdminUserOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow site administrators to edit models.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_staff