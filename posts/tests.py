from django.test import TestCase
from django.contrib.auth.models import User
from .models import Post
# Create your tests here.


class BlogTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        testuser1 = User.objects.create(
            username="testuser1", password="teset1234")
        testuser1.save()

        # blog post and set author to testuser1

        post = Post.objects.create(
            title="Test post", body="TDD rules", author=testuser1)
        post.save()

    def test_post_content(self):
        post = Post.objects.get(id=1)
        author = f'{post.author}'
        title = f'{post.title}'
        body = f'{post.body}'

        self.assertEqual(author, 'testuser1')
        self.assertEqual(title, 'Test post')
        self.assertEqual(body, 'TDD rules')
