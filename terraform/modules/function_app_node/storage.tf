// Random string to use for the function app storage account
resource "random_string" "this" {
  length  = 8
  upper   = false
  lower   = true
  number  = true
  special = false
}

// Storage account for function app to store code in
resource "azurerm_storage_account" "this" {
  name                = "${var.storage_account_prefix}${random_string.this.result}"
  resource_group_name = var.resource_group_name
  location            = var.location

  account_tier             = "Standard"
  account_replication_type = "LRS"
  account_kind             = "Storage"
  min_tls_version          = "TLS1_2"

  tags = var.tags
}

// Storage container to store the function app code
resource "azurerm_storage_container" "this" {
  name                  = var.name
  storage_account_name  = azurerm_storage_account.this.name
  container_access_type = "private"
}

// Blob containing function app code
resource "azurerm_storage_blob" "this" {
  name                   = "${var.name}.zip"
  storage_account_name   = azurerm_storage_account.this.name
  storage_container_name = azurerm_storage_container.this.name
  type                   = "Block"
  source                 = var.app_code_path
  content_md5            = filemd5(var.app_code_path)
  depends_on             = [azurerm_storage_container.this]
}

// Shared access secret allowing function app runtime to pull code from the storage account
// SAS will expire 1 year from deployment date
data "azurerm_storage_account_sas" "this" {
  connection_string = azurerm_storage_account.this.primary_connection_string
  https_only        = true
  start             = formatdate("YYYY-MM-DD", timestamp())
  expiry            = formatdate("YYYY-MM-DD", timeadd(timestamp(), "8760h"))
  resource_types {
    object    = true
    container = false
    service   = false
  }
  services {
    blob  = true
    queue = false
    table = false
    file  = false
  }
  permissions {
    read    = true
    write   = false
    delete  = false
    list    = false
    add     = false
    create  = false
    update  = false
    process = false
  }
}
