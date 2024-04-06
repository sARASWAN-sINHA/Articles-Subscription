from djoser.serializers import UserCreateSerializer, UserSerializer
from django.contrib.auth.models import Group

class CustomUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'is_writer', 'joined_on')
        # read_only_fields = ('email', 'first_name', 'last_name', 'is_writer',)

class CustomUserCreateSerializer(UserCreateSerializer):

    def create(self, validated_data):
        user = super().create(validated_data)
        is_writer_flag = validated_data.get('is_writer')

        user_group = Group.objects.get(name="Writer") if is_writer_flag==True else Group.objects.get(name="Client")
        user_group.user_set.add(user)

        return user

    class Meta(UserCreateSerializer.Meta):
        fields = ('email', 'password', 'first_name', 'last_name', 'is_writer', 'joined_on')
        extra_kwargs = {
            'last_name': {'required': False, 'allow_null': True},
        }






