const useHandleChange = ({ setFormData }) => {
	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return handleChange;
};

export default useHandleChange;
