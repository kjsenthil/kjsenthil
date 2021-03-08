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
  name                = format("%s-%s", var.environment_prefix, local.apima_name)
  api_management_name = data.terraform_remote_state.dev_apim.outputs.dev_apim_name
  resource_group_name = data.terraform_remote_state.dev_apim.outputs.dev_apim_rg
  revision            = "1"
}