import openai
import os

openai.api_key = "sk-gF1WYzxsZMk97XvvhrSzZYKJVGW_lErCLRfb1qT2ZvT3BlbkFJ-sAvW5CgDJnS4f0IGnfZQ0AZ5w0Suj2ZlD4A9cvuIA"

def call_chad(folder_path):

    # Initialize a string to store the contents of all the files
    files_content = ""
    print("About to read file content")
    # Iterate over each file in the folder
    for filename in os.listdir(folder_path):
        if filename.endswith(".txt"):  # Only read .txt files
            file_path = os.path.join(folder_path, filename)
            with open(file_path, 'r') as file:
                files_content += f"\n### File: {filename} ###\n"
                files_content += file.read() + "\n"


    request_string = """
    
    Please provide an overview of the experiment's structure and execution based on the relevant files, and return the information only as a JSON object. The JSON should include:

    Number of Subjects per Group: The number of subjects in each group.
    Number of Groups: The total number of groups involved in the experiment.
    Groups: A list containing details for each group, including:
    group_name: A unique identifier or name for the group.
    subjects: The number of subjects in the group.
    treatment: The treatment applied to the group.
    Pre-Launch Events: A detailed timeline of key events leading up to the launch of the experiment to space.
    Post-Return Events: A summary of events following the return of the experiment from space.
    Similar Experiments: Contextual information about similar experiments conducted previously, including:
    Experiments within OSDR using similar samples.
    Other experiments involving tissue samples from the same subjects.
    Ensure the JSON object is structured as follows:

    json
    Copy code
    {
    "number_of_groups": <number>,
    "groups": [
        {
        "group_name": "<name>",
        "subjects": <number>,
        "treatment": "<description>",
        "results": <description>
        }
    ],
    "pre_launch_events": [
        {
        "event": "<description>",
        "date": "<mm-dd-yyyy>"
        }
    ],
    "post_return_events": [
        {
        "event": "<description>",
        "date": "<mm-dd-yyyy>"
        }
    ],
    "similar_experiments": {
        "osdr_experiments": [
        {
            "experiment_id": "<id>",
            "description": "<description>"
        }
        ],
        "same_subject_experiments": [
        {
            "experiment_id": "<id>",
            "description": "<description>"
        }
        ]
    }
    }
    Notes:

    If there is more than one group, each group should be represented in the 'groups' list, capturing the unique details for that group.
    Ensure that only the JSON object is returned without any additional commentary or text.
    Make sure all relevant information is complete, accurate, and structured precisely as specified."""

    # print(files_content)
    completion = openai.ChatCompletion.create(
        model="gpt-4o-mini",            
        messages=[
                {"role": "user", "content": [{"type": "text", "text": request_string}, {"type": "text", "text": files_content}]}
            ]
        )
    print("Chat finished")
    # print(completion['choices'][0]['message']['content'].strip())
    return completion['choices'][0]['message']['content'].strip()

# response = call_chad("database/OSD-379_metadata_OSD-379-ISA")
# print(response)