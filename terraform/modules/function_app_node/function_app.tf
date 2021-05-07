// The actual function app
resource "azurerm_function_app" "this" {
  name                       = var.name
  location                   = var.location
  resource_group_name        = var.resource_group_name
  app_service_plan_id        = var.app_service_plan_id
  storage_account_name       = azurerm_storage_account.this.name
  storage_account_access_key = azurerm_storage_account.this.primary_access_key

  version    = "~3"
  https_only = true
  os_type    = var.os_type

  app_settings = {
    WEBSITE_RUN_FROM_PACKAGE = "https://${azurerm_storage_account.this.name}.blob.core.windows.net/${azurerm_storage_container.this.name}/${azurerm_storage_blob.this.name}${data.azurerm_storage_account_sas.this.sas}"
    FUNCTIONS_WORKER_RUNTIME = "node"
    FUNCTION_APP_EDIT_MODE   = "readonly"
    HASH                     = base64encode(filesha256(var.app_code_path))
  }

  auth_settings {
    enabled = false
  }

  site_config {
    linux_fx_version = "NODE|${var.node_version}"

    // Allow inbound traffic from the APIM VNet
    ip_restriction {
      name                      = "Allow traffic from subnet"
      virtual_network_subnet_id = var.subnet_id
      action                    = "Allow"
      priority                  = 1
    }
    // Implicit deny all is created for us

    // Deny all access to the Function app deployment endpoint
    scm_ip_restriction {
      name       = "Deny all access"
      ip_address = "0.0.0.0/0"
      action     = "Deny"
      priority   = 1
    }
  }

  tags = var.tags
}
