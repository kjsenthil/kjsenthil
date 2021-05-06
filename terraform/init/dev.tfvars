config = {
  "state" = {
    resource_group_name  = "tfstates"
    storage_account_name = "tfstates"
    containers           = ["devtfstate", "prtfstates"]
  }
}

environment = "dev"