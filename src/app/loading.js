
 // Import the spinner CSS

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
      }}
    >
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
