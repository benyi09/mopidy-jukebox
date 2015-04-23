"""Hello World API implemented using Google Cloud Endpoints.

Defined here are the ProtoRPC messages needed to define Schemas for methods
as well as those methods defined in an API.
"""


import endpoints
from protorpc import messages
from protorpc import message_types
from protorpc import remote

package = 'Jukebox'

class Track(messages.Message):
  id = messages.IntegerField(1)
  name = messages.StringField(2)

class User(messages.Message):
  id = messages.IntegerField(1)
  name = messages.StringField(2)
  gender = messages.StringField(3)
  tracks = messages.MessageField(Track, 4, repeated=True)

class UserCollection(messages.Message):
  users = messages.MessageField(User, 1, repeated=True)

class Greeting(messages.Message):
  """Greeting that stores a message."""
  message = messages.StringField(1)


class GreetingCollection(messages.Message):
  """Collection of Greetings."""
  items = messages.MessageField(Greeting, 1, repeated=True)


STORED_GREETINGS = GreetingCollection(items=[
    Greeting(message='hello world!'),
    Greeting(message='goodbye world!'),
])

STORED_USERS = UserCollection(users=[
    User(id=1, gender="Computer", name="Computer", tracks=[]),
    User(id=2, gender="Male", name="Benyi", tracks=[]),
])

@endpoints.api(name='jukebox', version='v1')
class JukeboxApi(remote.Service):
  """Jukebox API v1."""

  @endpoints.method(message_types.VoidMessage, GreetingCollection,
                    path='jukebox', http_method='GET',
                    name='greetings.listGreeting')
  def greetings_list(self, unused_request):
    return STORED_GREETINGS

  ID_RESOURCE = endpoints.ResourceContainer(
      message_types.VoidMessage,
      id=messages.IntegerField(1, variant=messages.Variant.INT32))

  @endpoints.method(ID_RESOURCE, Greeting,
                    path='jukebox/{id}', http_method='GET',
                    name='greetings.getGreeting')
  def greeting_get(self, request):
    try:
      return STORED_GREETINGS.items[request.id]
    except (IndexError, TypeError):
      raise endpoints.NotFoundException('Greeting %s not found.' %
                                        (request.id,))

  @endpoints.method(message_types.VoidMessage, UserCollection,
                    path='jukebox/users', http_method='GET',
                    name='users.listUsers')
  def users_list(self, unused_request):
    return STORED_USERS

  ID_RESOURCE = endpoints.ResourceContainer(
      message_types.VoidMessage,
      id=messages.IntegerField(1, variant=messages.Variant.INT32))

  @endpoints.method(ID_RESOURCE, User,
                    path='jukebox/users/{id}', http_method='GET',
                    name='users.getUser')
  def users_get(self, request):
    try:
      return STORED_USERS.users[request.id]
    except (IndexError, TypeError):
      raise endpoints.NotFoundException('User %s not found.' %
                                        (request.id,))

APPLICATION = endpoints.api_server([JukeboxApi])
