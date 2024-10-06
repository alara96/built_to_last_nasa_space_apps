import os
from zipfile import ZipFile
import requests

def download_file(url, output_directory, file_name):
    # Making sure the output directory exists
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)
    
    # Full path to save the file
    file_path = os.path.join(output_directory, file_name)
    # Sending a GET request to the URL
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(file_path, 'wb') as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        # Unzip folder
        new_file_name = file_name.split(".")[0]
        unzip_file(file_path, os.path.join(output_directory, new_file_name))
        print(f"Downloaded and extracted: {new_file_name}")
    else:
        print(f"Failed to download: {file_name}. HTTP Status Code: {response.status_code}")


def unzip_file(zip_file_path, extract_to_folder):
    # Ensure the output folder exists
    if not os.path.exists(extract_to_folder):
        os.makedirs(extract_to_folder)
    
    print(f"Unzipping {zip_file_path} to {extract_to_folder}")
    
    # Open the zip file in read mode
    try:
        # Attempt to open the zip file and extract its contents
        with ZipFile(zip_file_path, 'r') as zip_ref:
            zip_ref.extractall(extract_to_folder)
        print(f"Successfully extracted {zip_file_path} to {extract_to_folder}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    # Remove the zip file after extraction
    os.remove(zip_file_path)