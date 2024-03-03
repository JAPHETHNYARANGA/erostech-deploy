const ErrorDialog = ({ message, show }) => {
    if (!show) {
      return null; // Don't render anything if show is false
    }
  
    return (
      <div className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3" role="alert">
        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M12 14.41L10.59 13 7 16.59 8.41 18 10 16.41 12.59 18 14 16.59 10.41 13 12 11.41 13.41 10 12 8.41 10.59 7 8 9.41 6.59 11 10.41 15 11 16.41 12 14.41zM10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
        </svg>
        <p>{message}</p>
      </div>
    );
  };
  
  export default ErrorDialog;
  