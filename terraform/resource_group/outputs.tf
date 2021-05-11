output "resource_group_name" {
  value       = azurerm_resource_group.resource_group.name
  description = "The name of this resource group."
}

output "location" {
  value       = azurerm_resource_group.resource_group.location
  description = "The location in which this resource group is deployed."
}

output "artifact_storage_account_name" {
  value       = length(azurerm_storage_account.artifact_storage) > 0 ? azurerm_storage_account.artifact_storage[0].name : null
  description = "Name of the storage account used to house deployment artifacts"
}

output "artifact_container_name" {
  value       = length(azurerm_storage_container.artifact_container) > 0 ? azurerm_storage_container.artifact_container[0].name : null
  description = "Name of the container in the storage account used to house deployment artifacts"
}

output "test_artifacts_container_name" {
  value       = length(azurerm_storage_container.test_artifact_container) > 0 ? azurerm_storage_container.test_artifact_container[0].name : null
  description = "Name of the container in the storage account used to house test artifacts"
}
