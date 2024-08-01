import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


function BuyNowDialog({ addressInfo, setAddressInfo, buyNowFunction }) {


  return (
    <Dialog>
      <DialogTrigger asChild className='w-full'>
        <Button variant="">Buy Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy Now</DialogTitle>
          <DialogDescription>
            Enter your details to place order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder="Enter your Full Name"
              value={addressInfo.name}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  name: e.target.value
                })
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              className="col-span-3"
              placeholder="Enter your Full Address"
              value={addressInfo.address}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  address: e.target.value
                })
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pincode" className="text-right">
              Pincode
            </Label>
            <Input
              id="pincode"
              className="col-span-3"
              placeholder="Enter your Pincode"
              value={addressInfo.pincode}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  pincode: e.target.value
                })
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNo" className="text-right">
              Mobile Number
            </Label>
            <Input
              id="phoneNo"
              className="col-span-3"
              placeholder="Enter your Mobile Number"
              value={addressInfo.mobileNumber}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  mobileNumber: e.target.value
                })
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" 
          onClick={() => {
            buyNowFunction()
          }}
          >Buy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default BuyNowDialog
