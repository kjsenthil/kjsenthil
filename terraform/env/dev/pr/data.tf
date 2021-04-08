data "terraform_remote_state" "dev_apim" {
  backend = "azurerm"

  config = {
    resource_group_name  = "tstate"
    storage_account_name = "tstate6208"
    container_name       = "tstate"
    key                  = "digital-hybrid-backend/dev/apim/terraform.tfstate"
  }
}

data "azurerm_api_management_api" "pr_apia" {
  name                = azurerm_api_management_api.api.name
  api_management_name = local.apim_name
  resource_group_name = local.rg_name
  revision            = "1"
}