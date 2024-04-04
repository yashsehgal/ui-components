'use client';
import { ArrowRight, CreditCard, IndianRupee } from 'lucide-react';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/helpers';
import Image from 'next/image';

type PaymentOptionType = 'UPI' | 'Credit Card' | 'Debit Card';

type PaymentContextType = {
  paymentType: PaymentOptionType;
  setPaymentType: (type: PaymentOptionType) => void;
};

const INITIAL_PAYMENT_CONTEXT: PaymentContextType = {
  paymentType: 'Credit Card',
  setPaymentType: () => { },
};

const PaymentContext = createContext<PaymentContextType>({
  ...INITIAL_PAYMENT_CONTEXT,
});

function PaymentContextProvider({ children }: { children: ReactNode }) {
  // state for payment option type in context
  const [paymentType, setPaymentType] = useState<PaymentOptionType>(
    INITIAL_PAYMENT_CONTEXT.paymentType,
  );
  return (
    <PaymentContext.Provider value={{ paymentType, setPaymentType }}>
      {children}
    </PaymentContext.Provider>
  );
}

export default function PaymentEmbed() {
  return (
    <PaymentContextProvider>
      <div className="bg-neutral-100/80 rounded-xl shadow-inner p-2 w-[840px] h-[460px] flex flex-row items-stretch justify-start gap-2">
        <PaymentOptions />
        <PaymentView />
      </div>
    </PaymentContextProvider>
  );
}

function PaymentOptions() {
  const { paymentType, setPaymentType } = useContext(PaymentContext);
  const PAYMENT_OPTIONS: { option: PaymentOptionType; logo: ReactNode }[] = [
    { option: 'Credit Card', logo: <CreditCard className="w-4 h-4" /> },
    { option: 'UPI', logo: <IndianRupee className="w-4 h-4" /> },
    { option: 'Debit Card', logo: <CreditCard className="w-4 h-4" /> },
  ];
  return (
    <nav className="payment-options bg-white p-4 rounded-xl h-full w-[320px] shadow-lg shadow-neutral-200/60 border-neutral-200/60">
      <div className="payment-options-wrapper grid grid-cols-1 gap-2 items-start justify-start">
        {PAYMENT_OPTIONS.map(
          (
            { option: paymentOptionName, logo: paymentOptionLogo },
            index: number,
          ) => (
            <motion.button
              className={cn(
                'flex items-center justify-start gap-2 w-full p-2 rounded-lg bg-neutral-100',
                paymentType === paymentOptionName && 'bg-blue-500 gap-0',
              )}
              initial={{
                opacity: 0,
                y: 24 * (index + 1),
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileTap={{
                scale: 0.9,
              }}
              transition={{
                type: 'spring',
                duration: 1,
                bounce: 0.42,
              }}
              onClick={() => setPaymentType(paymentOptionName)}
              key={index}>
              <span
                className={cn(
                  'payment-option-logo px-2 py-1 rounded-md bg-white border border-neutral-200/80 shadow-lg shadow-neutral-100',
                  paymentType === paymentOptionName &&
                  'shadow-none border-transparent bg-transparent text-white',
                )}>
                <span className="payment-option-logo-wrapper w-3 h-3">
                  {paymentOptionLogo}
                </span>
              </span>
              <span
                className={cn(
                  'payment-option-name font-medium text-sm text-neutral-800',
                  paymentType === paymentOptionName && 'text-white',
                )}>
                {paymentOptionName}
              </span>
            </motion.button>
          ),
        )}
      </div>
    </nav>
  );
}

type CreditCardType = {
  cardNumber: string[];
  cvv: string;
  view: "card-number" | "cvv";
};

type CreditCardContextType = {
  creditCard: CreditCardType;
  setCreditCard: (data: CreditCardType) => void;
};

const INITIAL_CREDIT_CARD: CreditCardContextType = {
  creditCard: {
    cardNumber: Array(12).fill("*"),
    cvv: '',
    view: "card-number"
  },
  setCreditCard: () => { },
};

const CreditCardContext = createContext<CreditCardContextType>({
  ...INITIAL_CREDIT_CARD,
});

function CreditCardContextProvider({ children }: { children: ReactNode }) {
  const [creditCard, setCreditCard] = useState<CreditCardType>(
    INITIAL_CREDIT_CARD.creditCard,
  );

  useEffect(() => {
    if (creditCard.cardNumber.length === 0) {
      setCreditCard({ ...INITIAL_CREDIT_CARD.creditCard });
    }
  }, [creditCard.cardNumber])

  return (
    <CreditCardContext.Provider value={{ creditCard, setCreditCard }}>
      {children}
    </CreditCardContext.Provider>
  );
}

function CreditCardView() {
  const { creditCard } = useContext(CreditCardContext);
  return (
    <main className="credit-card-view">
      <div className="credit-card-number-wrapper">
        <motion.div
          className="mx-auto w-[400px] mb-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, rotateY: creditCard.view === "cvv" ? 180 : 0 }}
          transition={{
            type: "tween",
            duration: creditCard.view === "cvv" ? 0.6 : 0.2
          }}
        >
          <CreditCardPreview />
        </motion.div>
        {creditCard.view === "card-number" && <InputLabelWrapper withLabel="Card Number">
          <CreditCardNumberInput />
        </InputLabelWrapper>}
        {creditCard.view === "cvv" && <InputLabelWrapper withLabel='CVV'>
          <CVVInput />
        </InputLabelWrapper>}
      </div>
    </main>
  );
}

function CreditCardPreview() {
  const { creditCard, setCreditCard } = useContext(CreditCardContext);
  const [showNext, setShowNext] = useState<boolean>(false);

  useEffect(() => {
    if (!creditCard.cardNumber.includes("*") && creditCard.cardNumber.length >= 12) {
      setShowNext(true);
    } else {
      setShowNext(false);
    }
  }, [creditCard.cardNumber]);

  return (
    <div className="credit-card-preview relative h-[240px] bg-gradient-to-br from-neutral-900 to-neutral-700 overflow-hidden flex flex-row items-center justify-center rounded-xl shadow-2xl">
      <Image src="/card-bg.jpg" alt="credit-card-bg" width={500} height={300} />
      <div className="credit-card-details-wrapper absolute w-full h-full bg-gradient-to-b from-transparent to-black/80 p-6">
        {creditCard.view === "card-number" && <div className='card-number-wrapper absolute top-16 left-8'>
          <span className='text-white font-medium uppercase text-xs'>{"CARD NUMBER"}</span>
          <span className="text-white font-semibold text-xl flex flex-row items-start gap-2">
            {creditCard.cardNumber.map((digit: string, digitIndex: number) => {
              if (digitIndex <= 11) {
                return <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} key={digitIndex}>
                  {digit}
                </motion.p>
              }
            })}
          </span>
        </div>}
        {creditCard.view === "cvv" && <motion.div className="cvv-wrapper absolute top-16 right-8"
          initial={{
            rotateY: 180
          }}
        >
          <span className='text-white font-medium uppercase text-xs'>{"CVV"}</span>
          <span className="text-white font-semibold text-xl flex flex-row items-start gap-2">
            {creditCard.cvv.split("").map((digit: string, digitIndex: number) => {
              if (digitIndex < 3) {
                return <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} key={digitIndex}>
                  {digit}
                </motion.p>
              }
            })}
          </span>
        </motion.div>}
        {(showNext || creditCard.view === "cvv") && <motion.button initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }}
          className='rounded-full p-3 text-white absolute bottom-6 right-6 bg-gradient-to-b from-blue-500 to-blue-600'
          onClick={() => {
            setCreditCard({ ...creditCard, view: creditCard.view === "cvv" ? "card-number" : "cvv" });
            setShowNext(!showNext);
          }}
        >
          <ArrowRight className='w-4 h-4' />
        </motion.button>}
      </div>
    </div >
  );
}

function CVVInput() {
  const { creditCard, setCreditCard } = useContext(CreditCardContext);
  const [cvvInput, setCVVInput] = useState<string>(creditCard.cvv);

  useEffect(() => {
    setCreditCard({ ...creditCard, cvv: cvvInput });
  }, [cvvInput, setCreditCard, creditCard]);

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
    const truncatedValue = sanitizedValue.slice(0, 3);
    setCVVInput(truncatedValue);
  };

  return (
    <input
      type="text"
      placeholder="Enter your CVV"
      className="text-center px-4 py-2 rounded-xl w-[320px] border focus:outline-none placeholder:tracking-normal tracking-[12px]"
      value={cvvInput}
      onChange={handleCVVChange}
    />
  );
}

function CreditCardNumberInput() {
  const { creditCard, setCreditCard } = useContext(CreditCardContext);
  const [cardNumberInput, setCardNumberInput] = useState<string>("");

  useEffect(() => {
    let _updatedCardNumber: string = creditCard.cardNumber.join('');
    setCardNumberInput(_updatedCardNumber);
  }, [creditCard.cardNumber]);

  return (
    <input
      type="number"
      placeholder="Enter your Credit Card Number"
      className="text-center px-4 py-2 rounded-xl w-[320px] border focus:outline-none placeholder:tracking-normal tracking-[12px]"
      value={cardNumberInput}
      onChange={(e) => {
        // Avoid converting to number type
        let _updatedCardNumber: string[] = Array.from(e.target.value);
        setCreditCard({ ...creditCard, cardNumber: _updatedCardNumber });
      }}
    />
  );
}

const PaymentViewBody: Record<PaymentOptionType, ReactNode> = {
  'Credit Card': (
    <CreditCardContextProvider>
      <CreditCardView />
    </CreditCardContextProvider>
  ),
  'Debit Card': <></>,
  UPI: <></>,
};

function PaymentView() {
  const { paymentType } = useContext(PaymentContext);
  return (
    <div className="payment-view bg-white h-full shadow-lg shadow-neutral-200/60 w-full rounded-xl border-neutral-200/60 p-8">
      <PayingVia paymentType={paymentType} />
      <div className="payment-view-body-container py-6">
        {PaymentViewBody[paymentType]}
      </div>
    </div>
  );
}

function PayingVia({ paymentType }: { paymentType: PaymentOptionType }) {
  return (
    <h1 className="leading-snug font-semibold text-xl text-neutral-800 text-center">
      Paying via {paymentType}
    </h1>
  );
}

function InputLabelWrapper({
  children,
  withLabel,
}: {
  children: ReactNode;
  withLabel: string;
}) {
  return (
    <div className="input-label-wrapper flex flex-col items-center gap-3">
      <label
        htmlFor={withLabel}
        className="text-xs font-medium text-neutral-800">
        {withLabel}
      </label>
      {children}
    </div>
  );
}
