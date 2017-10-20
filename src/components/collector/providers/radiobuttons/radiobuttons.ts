import * as Tripetto from '@tripetto/forms-collector';
import { Component, Input } from '@angular/core';
import { IRadiobuttons, IRadiobutton } from 'tripetto-forms-radiobuttons';

const SELECTOR = 'tripetto-forms-radiobuttons';

interface IProps {
  id: string;
  name: string;
  description: string;
  explanation: string;
  placeholder: string;
  buttons: IRadiobutton[];
  selected: Tripetto.Data<string>;
}

@Component({
  selector: SELECTOR,
  templateUrl: './radiobuttons.html',
  styleUrls: ['./radiobuttons.css']
})
class RadiobuttonsComponent {
  @Input() props: IProps;

  updateRadiobutton(index, event) {
    if (event.target.checked) {
      const radiobutton = this.props.buttons[index];

      if (radiobutton) {
        this.props.selected.Set(radiobutton.Value || radiobutton.Name, radiobutton.Id);
      }
    }
  }
}

@Tripetto.node(SELECTOR)
export class RadiobuttonsProvider extends Tripetto.NodeProvider<IProps, IRadiobuttons> {
  static Component = RadiobuttonsComponent;

  public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): IProps {
    const button = this.DataAssert<string>(instance, 'button');
    const selected =
      Tripetto.F.FindFirst(this.Props.Radiobuttons, (radiobutton: IRadiobutton) =>
        Tripetto.F.CastToBoolean(button.Reference === radiobutton.Id)
      ) || Tripetto.F.ArrayItem(this.Props.Radiobuttons, 0);

    if (selected) {
      const value = Tripetto.F.FindFirst(this.Props.Radiobuttons, (radiobutton: IRadiobutton) => radiobutton.Id === selected.Id);

      button.Set(value ? value.Value || value.Name : undefined, selected.Id);
    }

    return {
      id: this.Node.Props.Id,
      name: this.Node.Props.NameVisible && this.Node.Props.Name,
      description: this.Node.Props.Description,
      explanation: this.Node.Props.Explanation,
      placeholder: this.Node.Props.Placeholder,
      buttons: this.Props.Radiobuttons,
      selected: button
    };
  }

  public OnValidate(instance: Tripetto.Instance): boolean {
    return true;
  }
}
