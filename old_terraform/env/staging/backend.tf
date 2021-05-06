terraform {
  required_version = "~> 0.14.7"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.40.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "tstate"
    storage_account_name = "tstate6208"
    container_name       = "tstate"
    key                  = "digital-hybrid-backend/staging/terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}
