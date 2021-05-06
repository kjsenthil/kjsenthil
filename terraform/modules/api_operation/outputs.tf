output "operation_id" {
  value       = azurerm_api_management_api_operation.api_operation.operation_id
  description = "The operation id of the API operations."
}

output "url_template" {
  value       = azurerm_api_management_api_operation.api_operation.url_template
  description = "The URL template for the API operation."
}