from djongo import models

class ImagePair(models.Model):
    title = models.CharField(max_length=100)
    before = models.CharField(max_length=255)
    comments = models.CharField(max_length=255)
    after = models.CharField(max_length=255)

    def set_after(self, url):
        self.after = url


class ImagesSet(models.Model):
    image_pairs = models.ArrayModelField(
        model_container=ImagePair
    )