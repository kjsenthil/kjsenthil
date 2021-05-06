config = {
  "state" = {
    resource_group_name  = "tfstates"
    storage_account_name = "tfstate"
    containers           = ["stagingtfstate"]
  }
}

environment = "staging"