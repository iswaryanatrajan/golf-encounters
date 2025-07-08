// PasswordModal.tsx
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";    



const PasswordModal = ({
  passwordInput,
  setPasswordInput,
  passwordError,
  setShowPasswordModal,
  handlePasswordSubmit,
  handleClosePasswordModal
}: any) => {
    const { t } = useTranslation();
  return ReactDOM.createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
            <h2 className="text-lg font-semibold mb-4">{t("ENTER_PASSWORD")}</h2>
            <input
              type="password"
              className="w-[3/4] border border-gray-300 rounded px-3 py-2 mb-2"
              placeholder={t("PASSWORD")}
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") handlePasswordSubmit();
              }}
            />
            {passwordError && (
              <div className="text-red-500 text-sm mb-2">{passwordError}</div>
            )}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={handleClosePasswordModal}
              >
                {t("CANCEL")}
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handlePasswordSubmit}
              >
                {t("JOIN_NOW")}
              </button>
            </div>
          </div>
        </div>,
    document.body
  );
};

export default PasswordModal;
