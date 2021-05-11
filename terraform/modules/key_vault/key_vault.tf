resource "azurerm_key_vault" "key_vault" {
  name                        = var.name
  resource_group_name         = var.resource_group_name
  location                    = var.location
  tags                        = merge(map("tf_module_path", "./terraform/modules/key_vault"), var.tags)
  enabled_for_disk_encryption = false
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  purge_protection_enabled    = false

  sku_name = "standard"
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = var.principal_id

    secret_permissions = [
      "Get"
    ]
  }
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Set", "Get"
    ]
  }
}
