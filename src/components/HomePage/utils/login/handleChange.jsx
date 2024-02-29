const useHandleChange = ({ setInputsFormValues }) => {
	const handleChange = (e) => {
		const { name, value } = e.target;

		setInputsFormValues((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return handleChange;
};

export default useHandleChange;
