const ContinueButton = ({ onClick, disabled }) => {
    return (
        <button className="btn mt-4" onClick={onClick} disabled={disabled}>
            {'Continue'}
        </button>
    );
};

export default ContinueButton;
