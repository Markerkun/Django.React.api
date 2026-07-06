import os
from django.conf import settings
from PIL import Image
import io
import uuid
from django.core.files.base import ContentFile

def compress_image(image_field, size=(800, 800), quality=85):
    image = Image.open(image_field).convert('RGB')
    image.thumbnail(size, Image.LANCZOS)
    uid = str(uuid.uuid4())[:10]
    image_name = '{}.webp'.format(uid)
    output = io.BytesIO()
    image.save(output, format='WEBP', quality=quality)
    output.seek(0)

    resized_image = ContentFile(output.getvalue())
    return resized_image, image_name

def save_custom_image(image, size, folder):
    resized_image, image_name = compress_image(image, size)
    # Створюємо шлях до директорії та шлях до файлу
    dir_path = os.path.join(settings.IMAGES_ROOT, folder)
    full_path = os.path.join(dir_path, image_name)
    # Створюємо папки, якщо їх ще не існує
    os.makedirs(dir_path, exist_ok=True)
    # Зберігаємо файл
    with open(full_path, "wb") as f:
        f.write(resized_image.read())
    return image_name