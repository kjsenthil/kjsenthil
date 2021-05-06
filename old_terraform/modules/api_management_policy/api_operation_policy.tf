resource "azurerm_api_management_api_operation_policy" "api_operation_policy" {
  api_name            = azurerm_api_management_api_operation.risk_questions.api_name
  api_management_name = azurerm_api_management_api_operation.risk_questions.api_management_name
  resource_group_name = azurerm_api_management_api_operation.risk_questions.resource_group_name
  operation_id        = azurerm_api_management_api_operation.risk_questions.operation_id
  xml_content         = var.policy_document
}