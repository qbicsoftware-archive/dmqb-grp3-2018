# DMQB-2018 Project 3 - Blockchain-based Data Sharing
The project assignment work of group 3 in the lecture DMQB



## System Requirements
For now this protoype implementation was only tested on a Linux system,
therefor this guide is only valid for Linux systems.

You need a few technical requirements in order for this prototype implementation to work.
The following tools need to be installed on the system:

+ Node.js (this was tested with version 10.5.0)
+ make sure that npm is installed (normally this comes with Node.js)
+ Git needs to be installed too

Another important tool that needs to be downloaded is *Ganache* on the following website
you can download a precompiled AppImage of *Ganache* which can be directly used without installing.

https://github.com/trufflesuite/ganache/releases

In order to interact with the blockchain you need to install the *MetaMask* browser plugin

https://metamask.io/


## How to test this prototype implementation

1. Start an instance of Ganache, which will serve as our private blockchain
2. Use the following command to deploy the smart contracts to the running private blockchain instance
  * `truffle migrate --reset`
3. call the following command to start the server instance used by the DApp
  * `npm run dev` (if this command leads to an error please read the section **Known Issues**)
4. Open MetaMask and configure it to use it
  * Connect to the private blockchain running on http://localhost:7545
  * restore password from mnemonic
5. Now you are ready to try the prototype.


## Known Issues

If you encounter problems running the command `npm run dev` most certainly
there is a problem with one of the needed node_modules the easiest way to fix
this is to redownload the node_modules and replace them.

To do so please run the following commands on the command line
(make sure you are in the root directory of this project):

1. `remove -r node_modules`
2. `mkdir temp`
3. `cd temp`
4. `truffle unbox pet-shop`
5. `cp -r node_modules ../`
6. `cd ..`
7. `remove -r temp`

Now you can retry the steps in shown in the previous Section.