package main

import (
	"fmt"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides the chaincode implementation
type SmartContract struct {
	contractapi.Contract
}

// InitLedger adds a base set of assets to the ledger
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	// Initialize the ledger with some data
	return nil
}

// CreateAsset adds a new asset to the ledger
func (s *SmartContract) CreateAsset(ctx contractapi.TransactionContextInterface, id string, value string) error {
	asset := Asset{
		ID:    id,
		Value: value,
	}
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return fmt.Errorf("failed to marshal asset: %v", err)
	}

	return ctx.GetStub().PutState(id, assetJSON)
}

// Asset defines the structure of the asset
type Asset struct {
	ID    string `json:"id"`
	Value string `json:"value"`
}

func main() {
	chaincode, err := contractapi.NewChaincode(&SmartContract{})
	if err != nil {
		fmt.Printf("Error creating chaincode: %v", err)
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting chaincode: %v", err)
	}
}
