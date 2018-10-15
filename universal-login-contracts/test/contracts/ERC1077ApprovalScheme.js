import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import ERC1077ApprovalScheme from '../../build/ERC1077ApprovalScheme';
import {createMockProvider, deployContract, getWallets, solidity} from 'ethereum-waffle';
import {addressToBytes32} from '../utils';
import {utils} from 'ethers';
import {EXECUTION_TYPE_MANAGEMENT, EXECUTION_TYPE_ACTION, OPERATION_CALL} from 'universal-login-contracts/lib/consts';

chai.use(chaiAsPromised);
chai.use(solidity);

const {parseEther} = utils;
const to = '0x0000000000000000000000000000000000000001';
const ETHER = '0x0000000000000000000000000000000000000000';

describe('ERC1077 Approval scheme', async () => {
  let provider;
  let deployer;
  let managementKey;
  let wallet;
  let identity;

  before(async () => {
    provider = createMockProvider();
    [deployer, wallet] = await getWallets(provider);
    managementKey = addressToBytes32(wallet.address);
    identity = await deployContract(deployer, ERC1077ApprovalScheme, [managementKey]);
    await deployer.send(identity.address, parseEther('1.0'));
    expect(await identity.requiredSignatures(0)).to.eq(1);
  });

  describe('construction', () => {
    it('should require one approval for management execution', async () => {
      expect(await identity.requiredSignatures(EXECUTION_TYPE_MANAGEMENT)).to.eq(1);
    });

    it('should require one approval for action execution', async () => {
      expect(await identity.requiredSignatures(EXECUTION_TYPE_ACTION)).to.eq(1);
    });

    it('should have 0 nonce', async () => {
      expect(await identity.lastNonce()).to.eq(0);
    });
  });

  describe('successful execution of transfer', () => {
    before(async () => {
      await identity.executeSigned(to, parseEther('1.0'), [], 0, 0, 0, ETHER, OPERATION_CALL, [], []);
    });

    it('transfer funds', async () => {
      expect(await provider.getBalance(to)).to.eq(parseEther('1.0'));
    });

    it('increase nonce', async () => {
      expect(await identity.lastNonce()).to.eq(1);
    });

    xit('refund');
    xit('emit event');
  });

  describe('fails if invalid nonce', () => {
    it('fails if nonce too low', async () => {
      await expect(identity.executeSigned(to, parseEther('1.0'), [], 0, 0, 0, ETHER, OPERATION_CALL, [], []))
        .to.be.revertedWith('Invalid nonce');
    });

    it('fails if nonce too high', async () => {
      await expect(identity.executeSigned(to, parseEther('1.0'), [], 2, 0, 0, ETHER, OPERATION_CALL, [], []))
        .to.be.revertedWith('Invalid nonce');
    });
  });

  describe('successful execution of call', () => {
    xit('called method');
    xit('increase nonce');
    xit('refunded');
  });

  describe('successful execution of transfer (multiple keys)', () => {
    xit('transfered funds');
    xit('increase nonce');
    xit('refunded');
  });


  xdescribe('fails if not enough signature', () => {
    xit('increase nonce');
    xit('refunded');
  });

  xdescribe('fails if invalid signature', () => {
    xit('increase nonce');
    xit('refunded');
  });

  xdescribe('fails if call fails', () => {
    xit('increase nonce');
    xit('refunded');
  });

  xdescribe('fails if not enough balance to refund', () => {
    xit('increase nonce');
    xit('refunded');
  });

  xdescribe('successful execution of create');
  xdescribe('successful execution of delegate call');
});
