import React, { useState } from "react";
import "../style/PalGameWorldSettingsEditor.css";

const PalGameWorldSettingsEditor = () => {
  const [settings, setSettings] = useState({
    ServerName: "Server Test",
    ServerDescription: "Test Server Description",
    ServerPassword: "PasswordHere",
    AdminPassword: "AdminPasswordHere",
    DayTimeSpeedRate: 1.0,
    NightTimeSpeedRate: 1.0,
    ExpRate: 1.0,
    PalCaptureRate: 1.0,
    PalSpawnNumRate: 1.0,
    CollectionDropRate: 1.0,
    CollectionObjectHpRate: 1.0,
    CollectionObjectRespawnSpeedRate: 1.0,
    EnemyDropItemRate: 1.0,
    DeathPenalty: "All",
    bEnablePlayerToPlayerDamage: false,
    bEnableFriendlyFire: false,
    bEnableAimAssistKeyboard: false,
    DropItemMaxNum: 3000,
    DropItemMaxNum_UNKO: 100,
    BaseCampMaxNum: 128,
    BaseCampWorkerMaxNum: 15,
    DropItemAliveMaxHours: 1.0,
    bAutoResetGuildNoOnlinePlayers: false,
    AutoResetGuildTimeNoOnlinePlayers: 72.0,
    GuildPlayerMaxNum: 20,
    PalEggDefaultHatchingTime: 72.0,
    WorkSpeedRate: 1.0,
    bIsMultiplay: false,
    bIsPvP: false,
    bCanPickupOtherGuildDeathPenaltyDrop: false,
    bEnableDefenseOtherGuildPlayer: false,
  });

  const handleInputChange = (field, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [field]: value,
    }));
  };

  const generateText = () => {
    const settingsText = Object.entries(settings)
      .filter(
        ([key, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(([key, value]) => {
        if (key === "DeathPenalty") {
          return `${key}=${value}`;
        } else {
          return `${key}=${JSON.stringify(value)}`;
        }
      })
      .join(",");

    return `[/Script/Pal.PalGameWorldSettings]\nOptionSettings=(${settingsText},BanListURL="https://api.palworldgame.com/api/banlist.txt")`;
  };

  const handleCopyText = () => {
    const generatedText = generateText();
    navigator.clipboard.writeText(generatedText).then(() => {
      alert("Text copied to clipboard!");
    });
  };

  return (
    <div className="pal-editor-container">
      <h1 >PalWorld .Ini Editor</h1>
      <form className="pal-form">
        {/* Add input fields for each setting */}
        {Object.entries(settings).map(([key, value]) => (
          <div className="pal-form-row" key={key}>
            <label className="pal-label">
              {key}:
              {key === "DeathPenalty" ? (
                <select
                  className="pal-select"
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                >
                  <option value="None">None</option>
                  <option value="Item">Item</option>
                  <option value="ItemAndEquipment">ItemAndEquipment</option>
                  <option value="All">All</option>
                </select>
              ) : typeof value === "boolean" ? (
                <input
                  className="pal-checkbox"
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleInputChange(key, e.target.checked)}
                />
              ) : (
                <input
                  className="pal-text"
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              )}
            </label>
            <br />
          </div>
        ))}

        {/* Display the generated text */}
        <div className="pal-form-row">
          <h2>Generated Text:</h2>
          <textarea className="pal-textarea" rows="10" cols="100" value={generateText()} readOnly />
        </div>

        {/* Copy Text button */}
        <button className="pal-button" type="button" onClick={handleCopyText}>
          Copy Text
        </button>
      </form>
    </div>
  );
};

export default PalGameWorldSettingsEditor;
