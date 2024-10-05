import dash
from dash import dcc, html, Input, Output
import dash_bootstrap_components as dbc
import plotly.express as px
import pandas as pd
import datetime

# Load and preprocess the data
# Note: The data would ideally be extracted directly from the uploaded files. For simplicity, here I'll mock the data.
sample_data = {
    'Group': ['Flight', 'Habitat Ground Control', 'Vivarium Ground Control'] * 9,
    'Subject ID': [f'RR23_FLT_{i+1}' for i in range(9)] + [f'RR23_HGC_{i+1}' for i in range(9)] + [f'RR23_VGC_{i+1}' for i in range(9)],
    'Age at Launch (weeks)': [16] * 27,
    'Age at Euthanasia (weeks)': [22, 23, 22, 23, 22, 23, 23, 22, 22] * 3,
    'Body Weight (grams)': [35.9, 33.5, 27.3, 33.9, 29.9, 29.1, 32.3, 30.4, 34.1] * 3,
    'RNA Quality (RINe)': [8.5, 8.4, 8.4, 8.6, 8.5, 9.1, 8.6, 8.3, 8.8] * 3,
    'Treatment': ['Spaceflight Exposure', 'Habitat Ground Control', 'Vivarium Ground Control'] * 9
}

# Convert data to DataFrame
df_samples = pd.DataFrame(sample_data)

# Create Dash application
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

# Layout of the dashboard
app.layout = dbc.Container([
    html.H1("Space Experiment Explorer (SEE)"),
    html.Hr(),

    # Quick Summary Cards
    dbc.Row([
        dbc.Col(dbc.Card([dbc.CardBody([
            html.H4("Number of Subjects per Group"),
            html.P("Flight: 9, HGC: 9, VGC: 9")
        ])]), width=4),
        dbc.Col(dbc.Card([dbc.CardBody([
            html.H4("Treatments"),
            html.P("Flight: Spaceflight Exposure, HGC: Habitat Ground Control, VGC: Vivarium Ground Control")
        ])]), width=4),
        dbc.Col(dbc.Card([dbc.CardBody([
            html.H4("Mouse Weight Overview"),
            html.P("Weight range: 27.3g - 35.9g")
        ])]), width=4),
    ], className="mb-4"),

    # Subject Information Visualizations
    dbc.Row([
        dbc.Col(dcc.Graph(id='subject-distribution', figure=px.histogram(df_samples, x='Group', color='Group', title='Distribution of Subjects per Group'))),
    ], className="mb-4"),

    # Timeline Visualization
    dbc.Row([
        dbc.Col(html.Div([
            html.H4("Experiment Timeline"),
            dcc.Graph(
                id='timeline-visualization',
                figure=px.timeline(
                    pd.DataFrame({
                        'Event': ['Launch', 'Spaceflight', 'Splashdown', 'Recovery', 'Dissection'],
                        'Start': [datetime.datetime(2020, 12, 5), datetime.datetime(2020, 12, 6), datetime.datetime(2021, 1, 13), datetime.datetime(2021, 1, 13), datetime.datetime(2021, 1, 14)],
                        'Finish': [datetime.datetime(2020, 12, 5), datetime.datetime(2021, 1, 13), datetime.datetime(2021, 1, 13), datetime.datetime(2021, 1, 14), datetime.datetime(2021, 1, 17)]
                    }),
                    x_start='Start', x_end='Finish', y='Event', title='Timeline of Key Events'
                )
            )
        ]))
    ]),

    # Interactive Flowchart (Simplified as a graph)
    dbc.Row([
        dbc.Col(html.Div([
            html.H4("Experimental Design Flowchart"),
            dcc.Graph(
                id='flowchart',
                figure=px.sunburst(
                    df_samples, path=['Group', 'Subject ID'], title='Flow of Subjects Through Experimental Phases'
                )
            )
        ]))
    ])
], fluid=True)

# Run the application
if __name__ == '__main__':
    app.run_server(debug=True)