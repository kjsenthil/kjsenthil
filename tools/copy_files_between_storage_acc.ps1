$SrcStorageAccountName = "digitalhybridspike"
$SrcStorageAccountRG = "digital-hybrid-resources"
$SrcContainerName = "src"

$DstStorageAccountName = "digitalhybridmanual"
$DstStorageAccountRG = "digital-hybrid-resources" 
$DstContainerName = "dest"

function Copy-FilesToAzureStorageContainer {
    [cmdletbinding()]
    param(
        $SrcStorageAccountName,
        $SrcStorageAccountRG,
        $SrcContainerName,
        $DstStorageAccountName,
        $DstStorageAccountRG,
        $DstContainerName,
        $Force
    )
    $SrcStorageAccount = Get-AzStorageAccount -ResourceGroupName $SrcStorageAccountRG -AccountName $SrcStorageAccountName
    $SrcContext  = $SrcStorageAccount.Context

    $DstStorageAccount = Get-AzStorageAccount -ResourceGroupName $DstStorageAccountRG -AccountName $DstStorageAccountName
    $DstContext  = $DstStorageAccount.Context

    $blobs = Get-AzStorageBlob -Context $SrcContext -Container $SrcContainerName
    $blobs | Start-AzStorageBlobCopy -Context $SrcContext -DestContext $DstContext -DestContainer $DstContainerName -Force:$Force 
}

function Create-AzureStorageContainer {
    [cmdletbinding()]
    param(
        $StorageAccountName,
        $StorageAccountRG,
        $ContainerName
    )
    $StorageAccount = Get-AzStorageAccount -ResourceGroupName $StorageAccountRG -AccountName $StorageAccountName
    $Context  = $StorageAccount.Context
    New-AzStorageContainer -Context $Context -Name $ContainerName
}

#Create-AzureStorageContainer -StorageAccountName $DstStorageAccountName -StorageAccountRG $DstStorageAccountRG -ContainerName test03
#Copy-FilesToAzureStorageContainer -SrcStorageAccountName $SrcStorageAccountName -SrcStorageAccountRG $SrcStorageAccountRG -SrcContainerName $SrcContainerName -DstStorageAccountName $DstStorageAccountName -DstStorageAccountRG $DstStorageAccountRG -DstContainerName $DstContainerName
