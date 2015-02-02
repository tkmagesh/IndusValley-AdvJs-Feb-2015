function SalaryCalculator(basic, hra, da, tax){
   this.basic = basic || 0;
   this.hra = hra || 0;
   this.da = da || 0;
   this.tax = tax || 0;
   this.salary = 0;

   var calcCount = 0;

}
SalaryCalculator.prototype.calculate = function(){
      var gross = this.basic + this.hra + this.da;
      this.salary = gross * ((100-this.tax)/100);
      return ++calcCount;
   }