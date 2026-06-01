import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only `youtube_url` is sent to the Actor; the Output / Fields parameters
 * shape the data we return, they are not part of the Actor input.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		youtube_url: context.getNodeParameter('youtube_url', itemIndex),
	};
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Transcript',
				value: 'transcript',
			},
		],
		default: 'transcript',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transcript'],
			},
		},
		options: [
			{
				name: 'Get Transcripts',
				value: 'getTranscripts',
				action: 'Get transcripts from one or more videos',
				description:
					'Retrieve transcripts, subtitles, and captions from one or more YouTube videos',
			},
		],
		default: 'getTranscripts',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'YouTube URL or URLs',
		name: 'youtube_url',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ',
		description:
			'One YouTube URL as a string, or multiple URLs as an array. Supports standard videos, Shorts, youtu.be short links, embed URLs, and mobile URLs.',
		displayOptions: {
			show: {
				resource: ['transcript'],
				operation: ['getTranscripts'],
			},
		},
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transcript'],
				operation: ['getTranscripts'],
			},
		},
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the Actor produces, including timestamped segments',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return only the video ID, language, and full transcript text',
			},
		],
		default: 'simplified',
		description: 'How much of the Actor result to return for each video',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['transcript'],
				operation: ['getTranscripts'],
				output: ['selected'],
			},
		},
		options: [
			{ name: 'Error', value: 'error' },
			{ name: 'Error Message', value: 'error_message' },
			{ name: 'Error Type', value: 'error_type' },
			{ name: 'Full Transcript', value: 'non_timestamped' },
			{ name: 'Is Auto-Generated', value: 'is_generated' },
			{ name: 'Is Translatable', value: 'is_translatable' },
			{ name: 'Language', value: 'language' },
			{ name: 'Language Code', value: 'language_code' },
			{ name: 'Processing Timestamp', value: 'timestamp' },
			{ name: 'Success', value: 'success' },
			{ name: 'Timestamped Transcript', value: 'timestamped' },
			{ name: 'Total Duration (Seconds)', value: 'total_seconds' },
			{ name: 'Translation Languages', value: 'translation_languages' },
			{ name: 'URL', value: 'url' },
			{ name: 'Video ID', value: 'video_id' },
		],
		default: ['video_id', 'language', 'non_timestamped'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
