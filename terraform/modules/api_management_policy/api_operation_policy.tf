resource "azurerm_api_management_api_operation_policy" "api_operation_policy" {
  api_name            = var.apima_name
  api_management_name = var.apim_name
  resource_group_name = var.resource_group_name
  operation_id        = var.operation_id
  xml_content         = var.xml_policy_file
}