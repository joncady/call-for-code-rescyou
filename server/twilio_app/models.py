from djongo import models

class Contact(models.Model):
    name = models.CharField(max_length=100)
    number = models.CharField(max_length=12)


class ContactsList(models.Model):
    contacts = models.ArrayModelField(model_container=Contact)