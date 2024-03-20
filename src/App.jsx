import { useState } from "react";
import "./App.css";
import Bubble from "./components/Bubble";
import usePasswordGenerator from "./hooks/use-password-generator";
import Button from "./components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customId = "custom-id-yes";

function App() {
  const [length, setLength] = useState(8);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState("");

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  let { generatePassword } = usePasswordGenerator();

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleGeneratePassword = () => {
    generatePassword(checkboxData, length)
      .then((result) => {
        setPassword(result.password);
        toast.dismiss();
      })
      .catch((err) =>
        toast.error(err.msg, {
          toastId: customId,
        })
      );
  };

  return (
    <>
      <Bubble />
      <div className="container">
        <div className="password-generator__title">
          <span>Password Generator</span>
        </div>
        <div className="password-generator__body">
          <div className="password-text">
            <span>{password}</span>
            <Button
              disabled={!password}
              title={copied ? "Copied" : "Copy"}
              onClick={handleCopy}
            />
          </div>

          <div className="password-length">
            <div className="sub-title">
              <span>Password Lenght</span>
              <span>{length}</span>
            </div>
            <input
              type="range"
              min="4"
              max="20"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div className="password-settings">
            <div className="sub-title">
              <span>Password Settings</span>
            </div>

            <div className="password-requires">
              {checkboxData.map((checkbox, index) => {
                return (
                  <div key={index} className="checkbox">
                    <input
                      id={checkbox.title}
                      type="checkbox"
                      onChange={() => handleCheckboxChange(index)}
                      checked={checkbox.state}
                    />
                    <label htmlFor={checkbox.title}>{checkbox.title}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="password-settings">
            <Button
              title="Generate Password"
              onClick={handleGeneratePassword}
              className="generate-password"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
