import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/style.css";
import { useDispatch, useSelector } from "react-redux";
import { loadLoggedInUser } from "../../../store/authSlice";
import { addTransaction } from "../../../store/productSlice";

const WithdrawalPage = () => {
  const dispatch = useDispatch();
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [banks, setBanks] = useState([]);
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [fecthAccountStatus, setFecthAccountStatus] = useState("");

  const profile = useSelector((state) => state.app.user.profile);
  const transactionloading = useSelector(
    (state) => state.app.products.transactionloading
  );
  const getBankName = async (number) => {
    try {
      setFecthAccountStatus("Fetching your Account details");
      const result = await axios.post(
        "https://api.flutterwave.com/v3/accounts/resolve",
        {
          account_number: number,
          account_bank: bank,
        },
        {
          headers: {
            Authorization: "Bearer FLWSECK-8784009391a9c53cc089aed215c14dea-X",
            "Content-Type": "application/json",
          },
        }
      );

      setAccountName(result.data.data.account_name);
      setFecthAccountStatus(result.data.message);
    } catch (error) {
      setFecthAccountStatus("Fetching your Account details failed");
    }
  };
  const getBanks = async () => {
    try {
      setLoadingBanks(true);
      const result = await axios.get(
        "https://api.ravepay.co/v2/banks/NG?public_key=FLWPUBK_TEST-5120f20f66db336ffc0f6131bcc49936-X"
      );
      const banks = result.data.data.Banks;
      setBanks(banks);
      setLoadingBanks(false);
    } catch (error) {
      setLoadingBanks(false);
    }
  };
  const transfer = async () => {
    try {
      const result = await axios.post(
        "https://api.flutterwave.com/v3/transfers",
        {
          account_bank: bank,
          account_number: accountNumber,
          amount,
          narration: "Withdrawal to Account",
          currency: "NGN",
          reference: Date.now() + profile._id,
          callback_url:
            "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
          debit_currency: "NGN",
        },
        {
          headers: {
            "Content-Type": " application/json",
            Authorization: `Bearer FLWSECK-8784009391a9c53cc089aed215c14dea-X`,
          },
        }
      );
      if (result.data.status === "success") {
        dispatch(
          addTransaction({
            description: "Withdrawal to my own account",
            amount,
            data: result.data,
          })
        );
      }
    } catch (error) {}
  };

  const sortedList =
    banks &&
    banks.sort(function (a, b) {
      var textA = a.Name.toUpperCase();
      var textB = b.Name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

  useEffect(() => {
    if (banks.length === 0) {
      getBanks();
      dispatch(loadLoggedInUser());
    }
  }, []);
  return (
    <div id="payment" className="container my-4">
      <div className="card">
        <div className="card-header">Withdraw </div>
        <div className="card-body">
          <div className="link-x-small">
            <span className="text-x-small"> Available Balance</span> NGN
            {profile.availableBalance}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (amount <= profile.availableBalance) {
                transfer();
              }
            }}
          >
            <select
              className="form-control form-control-lg"
              name="bank"
              id="bank"
              onChange={(e) => {
                setBank(e.target.value);
              }}
              required
            >
              <option value="">Select Bank</option>
              {sortedList.map((bank) => (
                <option value={bank.Code}>{bank.Name}</option>
              ))}
            </select>
            {loadingBanks && <div className="loader"></div>}

            <br />
            <input
              className="form-control form-control-lg"
              type="number"
              name="accountNumber"
              id="accountNumber"
              maxLength={10}
              minLength={10}
              placeholder="Account Number"
              required
              defaultValue={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
                if (e.target.value.length === 10) {
                  getBankName(e.target.value);
                }
              }}
            />
            {fecthAccountStatus && (
              <div className="my-2 text-x-small">{fecthAccountStatus}...</div>
            )}
            <br />
            <input
              className="form-control form-control-lg"
              type="number"
              name="accountName"
              id="accountName"
              placeholder="Account Name"
              defaultValue={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
            <br />
            <input
              className="form-control form-control-lg"
              type="number"
              name="amount"
              id="amount"
              placeholder="Amount"
              required
              defaultValue={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {profile.availableBalance < amount && (
              <p className="text-danger text-x-small">
                You can not withdraw more than your available Balance
              </p>
            )}
            {amount > 0 && amount < 100 && (
              <p className="text-danger text-x-small">
                You can not withdraw less than NGN 100
              </p>
            )}
            <input
              type="submit"
              value="Withdraw"
              className="btn btn-success my-3 btn-lg"
              disabled={transactionloading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPage;
