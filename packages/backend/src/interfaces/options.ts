export default interface Options {
	/** The location of the installation directory */
	path?: string;
	/** The name of the applications folder. Defaults to `applications` */
	applicationFolderName?: string;
	/** Whether or not to only use local environment */
	neverDownload?: boolean;
	/** Company @ symbol to use for applications */
	company: string;
	/** Repository URL */
	repository: string;
}