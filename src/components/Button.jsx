// eslint-disable-next-line react/prop-types
const Button = ({ title, className, onClick, disabled }) => {
	return (
		<button disabled={disabled} className={className} onClick={onClick}>
			{title}
		</button>
	);
};

export default Button;
