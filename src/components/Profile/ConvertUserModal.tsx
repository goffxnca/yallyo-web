import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import Rules from "../Rules";
import Modal from "../UIs/Modal";

interface Props {
  onCloseModal: Function;
  onConvertUser: Function;
}

const ConvertUserModal = ({ onCloseModal, onConvertUser }: Props) => {
  return (
    <Modal emitClose={onCloseModal}>
      <div className="p-5 md:p-10 md:w-[600px] text-white">
        <div className="h-96 md:h-[500px] overflow-scroll">
          <h2 className="text-accent2 text-2xl md:text-3xl text-center mb-6">
            Convert to Permanent Account
          </h2>

          <div className="space-y-2">
            <h3 className="font-semibold">
              About Your Current Temporary Account:
            </h3>
            <div className="ml-4 space-y-4 text-gray-200">
              <p>
                Your temporary account allows 3 months of platform exploration,
                experiencing Yallyo&apos;s initial features without commitment.
                When you see the benefits of using our platform, easily switch
                to a permanent account to access full features by just linking
                it to your Google account for seamless data transfer. And
                here&apos;s the best part: this conversion is totally free.
              </p>
              <p>
                As you approach the 3-month mark, a conversion button below will
                be available, making the transition smooth. Plus, you&apos;ll
                receive reminders to avoid unintended expiration. Enjoy
                uninterrupted access, knowing your experience is important to
                us.
              </p>
            </div>

            <h3 className="font-semibold pt-4">
              Important Note Regarding Logging Out:
            </h3>
            <div className="ml-4 space-y-4 text-gray-200">
              <p>
                Please note that, logging out isn&apos;t available for temporary
                users. Accidentally logging out could lead to permanent loss, as
                temporary accounts aren&apos;t tied to real emails. These
                accounts have a unique login process with securely stored
                sessions. To avoid losing your temporary account before
                conversion, keep Yallyo&apos;s browser data uncleared.
              </p>
              <p>
                Your understanding is greatly appreciated as we enhance
                everyone&apos;s experience. If you have questions, reach out to
                our support team. Enjoy your time on Yallyo&apos;s language
                exchange community!
              </p>
            </div>
          </div>

          <div className="sticky bottom-0 flex justify-center bg-secondary pt-2">
            <button
              type="submit"
              className={`flex rounded-md px-6 py-3 text-sm font-semibold shadow-sm select-none opacity-25 bg-accent1 text-white  cursor-not-allowed`}
              disabled={true}
            >
              <div className="animate-pulse">
                <ArrowsRightLeftIcon className="h-5 w-5 mr-2" />
              </div>

              <span className="text-md">Convert Now</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConvertUserModal;
