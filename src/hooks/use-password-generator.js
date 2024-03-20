const usePasswordGenerator = () => {
  const generatePassword = (checkboxData, length) => {
    return new Promise((resolve, reject) => {
      let charset = "",
        generatedPassword = "";

      const selectedOption = checkboxData.filter((checkbox) => checkbox.state);

      if (selectedOption.length === 0) {
        reject({ msg: "Select at least one option.", password: "" });
        return;
      }

      selectedOption.forEach((option) => {
        switch (option.title) {
          case "Include Uppercase Letters":
            charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
          case "Include Lowercase Letters":
            charset += "abcdefghijklmnopqrstuvwxyz";
            break;
          case "Include Numbers":
            charset += "0123456789";
            break;
          case "Include Symbols":
            charset += "!@$%^&*()";
            break;
          default:
            break;
        }
      });

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
      }

      resolve({ msg: "Generated", password: generatedPassword });
    });
  };

  return { generatePassword };
};

export default usePasswordGenerator;
