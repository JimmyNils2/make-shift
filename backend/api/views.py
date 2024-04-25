from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer, EventSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Event


class CreateUserView(generics.CreateAPIView):

    """
        Provide a view for creating new users for any user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserList(generics.ListCreateAPIView):
    """
        Provide a view for both creating and listing user for authenticated users
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.get_queryset()


class UserDetail(generics.RetrieveAPIView):
    """
        Provide a view for list the details of the same authenticated user
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        request_user = self.request.user
        return request_user


class EventListCreate(generics.ListCreateAPIView):
    """
        Provide a view for list events created by the same authenticated user
    """
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(createdBy=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(createdBy=self.request.user)
        else:
            print(serializer.errors)


class AllEventList(generics.ListCreateAPIView):
    """
        Provide a view for list all created events for authenticated users
    """
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Event.objects.get_queryset()


class EventDelete(generics.DestroyAPIView):
    """
        Provide a view to delete event objects created by the same authenticated user
    """
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(createdBy=self.request.user)


class EventUpdate(generics.UpdateAPIView):
    """
        Provide a view to update event objects created by the same authenticated user
    """
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            event = Event.objects.get(pk=pk, createdBy=self.request.user)
        except Event.DoesNotExist:
            return Response({'error': 'Event not found or unauthorized access'}, status=status.HTTP_404_NOT_FOUND)

        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
