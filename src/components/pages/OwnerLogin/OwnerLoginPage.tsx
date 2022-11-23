// import { BrowserView, MobileView } from "react-device-detect";
import React, { useContext, useState } from "react";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useSigner,
} from "@thirdweb-dev/react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { authState } from "../../../state/atoms";
import { SnackbarContext } from "../../../state/hooks";

import {
  MetaMaskLogo,
  WalletConnectLogo,
  CoinbaseLogo,
} from "../../../assets/svg";

const Container = styled.div`
  height: calc(100% - 64px);
  padding-bottom: 8%;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.p`
  font-size: 40px;
  letter-spacing: 0.4px;
  margin-bottom: 60px;
`;

const StyledWalletOptions = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  min-width: 350px;
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const Component = () => {
  const disconnectWallet = useDisconnect();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();

  // was added by JJ - not sure why we need to disconnect first - don't like the 1 second delay
  const connectMetaMaskWallet = () => {
    disconnectWallet();
    setTimeout(connectWithMetamask, 1000);
  };

  const connectWalletConnectWallet = () => {
    disconnectWallet();
    setTimeout(connectWithWalletConnect, 1000);
  };

  const connectCoinbasetWallet = () => {
    disconnectWallet();
    setTimeout(connectWithCoinbaseWallet, 1000);
  };

  return (
    <Container className="bg-mainBg">
      <StyledContainer>
        <StyledTitle className="text-center font-gilroy font-bold">
          Connect your wallet
        </StyledTitle>
        <StyledWalletOptions className="bg-white">
          <div
            className="hidden md:flex flex-1 flex-col py-1 items-center justify-center border-0 border-b-2 border-b-borderGray border-solid hover:cursor-pointer"
            onClick={connectMetaMaskWallet}>
            <MetaMaskLogo />
            <div className="font-inter font-bold text-2xl mt-4">MetaMask</div>
            <div className="font-inter text-sm">
              Connect to your Metamask Wallet
            </div>
          </div>
          <div
            className="flex flex-1 flex-col py-1 items-center justify-center border-0 border-b-2 border-b-borderGray border-solid hover:cursor-pointer"
            onClick={connectWalletConnectWallet}>
            <WalletConnectLogo />
            <div className="font-inter font-bold text-2xl mt-4">
              WalletConnect
            </div>
            <div className="font-inter text-sm">
              Scan WalletConnect QR to connect
            </div>
          </div>
          <div
            className="hidden md:flex flex flex-1 flex-col py-1 items-center justify-center hover:cursor-pointer"
            onClick={connectCoinbasetWallet}>
            <CoinbaseLogo />
            <div className="font-inter font-bold text-2xl mt-4">Coinbase</div>
            <div className="font-inter text-sm">
              Connect to your Coinbase wallet
            </div>
          </div>
        </StyledWalletOptions>
      </StyledContainer>
    </Container>
  );
};

export default Component;
