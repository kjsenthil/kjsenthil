terraform {
  backend "azurerm" {
    resource_group_name  = "tstate"
    storage_account_name = "tstate6208"
    container_name       = "tstate"
    key                  = "digital-hybrid/terraform.tfstate"
  }
}