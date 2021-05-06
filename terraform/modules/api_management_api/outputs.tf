output "revision" {
  value       = azurerm_api_management_api.api.revision
  description = "API revision number."
}

output "name" {
  value       = azurerm_api_management_api.api.name
  description = "Name of the API."
}

output "path" {
  value       = azurerm_api_management_api.api.path
  description = "The API operation path."
}