App = {
    web3Provider: null,
    contracts: {},

    init: function () {
        // Load genome data emtries.
        $.getJSON('../genomicData.json', function (data) {
            let genomicDataRow = $('#genomicDataRow');
            let genomicDataTemplate = $('#genomicDataTemplate');

            for (let i = 0; i < data.length; i++) {
                genomicDataTemplate.find('.panel-title').text(data[i].name);
                genomicDataTemplate.find('img').attr('src', 'images/dna-helices.jpg');
                genomicDataTemplate.find('.genomicData-size').text(data[i].size);
                genomicDataTemplate.find('.genomicData-assemblyId').text(data[i].assemblyId);
                genomicDataTemplate.find('.genomicData-bioProject').text(data[i].bioProject);
                genomicDataTemplate.find('.genomicData-assemblyLevel').text(data[i].assemblyLevel);
                genomicDataTemplate.find('.genomicData-fileLocation').attr('href', data[i].fileLocation);
                genomicDataTemplate.find('.genomicData-fileLocation').attr('data-id', data[i].id);
                genomicDataTemplate.find('.btn-buy').attr('data-id', data[i].id);

                genomicDataRow.append(genomicDataTemplate.html());
            }
        });

        return App.initWeb3();
    },

    initWeb3: function () {
        // Is there an injected web3 instance?
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },

    initContract: function () {
        $.getJSON('BuyGenomicData.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract
            let BuyGenomicDataArtifact = data;
            App.contracts.BuyGenomicData = TruffleContract(BuyGenomicDataArtifact);

            // Set the provider for our contract
            App.contracts.BuyGenomicData.setProvider(App.web3Provider);

            // Use our contract to retrieve and show the link of the bought data entries
            return App.markBought();
        });

        return App.bindEvents();
    },

    bindEvents: function () {
        $(document).on('click', '.btn-buy', App.handleBuying);
    },

    markBought: function (buyers, account) {
        let buyingInstance;

        App.contracts.BuyGenomicData.deployed().then(function (instance) {
            buyingInstance = instance;

            return buyingInstance.getBuyers.call();
        }).then(function (buyers) {
            for (let i = 0; i < buyers.length; i++) {
                if (buyers[i] !== '0x0000000000000000000000000000000000000000') {
                    $('.panel-genomicData').eq(i).find('a').show();
                    $('.panel-genomicData').eq(i).find('button').text('Already bought').attr('disabled', true);
                }
            }
        }).catch(function (err) {
            console.log(err.message);
        });
        
    },

    handleBuying: function (event) {
        event.preventDefault();

        let genomicDataId = parseInt($(event.target).data('id'));

        let buyingInstance;

        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }

            let account = accounts[0];

            App.contracts.BuyGenomicData.deployed().then(function (instance) {
                buyingInstance = instance;

                // Execute buy as a transaction by sending account
                return buyingInstance.buy(genomicDataId, {from: account});
            }).then(function (result) {
                return App.markBought();
            }).catch(function (err) {
                console.log(err.message);
            });
        });
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
